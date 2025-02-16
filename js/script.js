
function heById(eid)
{
    return document.getElementById(eid);
}

function heByName(eid)
{
    return document.getElementsByName(eid);
}

var _timerOnStartSearch = null;
function onStartSearch()
{
    clearTimeout(_timerOnStartSearch);
    _timerOnStartSearch = setTimeout(function()
    {
        const pattern = heById("si-pattern").value.toLowerCase();
        const bSearchVar = heById("so-variable").checked;
        const bSearchCmd = heById("so-command").checked;
        const bSearchExec = heById("so-exec").checked;
        const bSearchDescription = heById("so-description").checked;

        var cvar = null;
        heByName("uever").forEach((e, i) =>
        {
            if (e.checked)
                cvar = _uevList[i].cvar;
        });
        var result = "";
        cvar?.forEach(e =>
        {
            var bTypePass = false;
            if (bSearchVar && e.type == "Var") bTypePass = true;
            if (bSearchCmd && e.type == "Cmd") bTypePass = true;
            if (bSearchExec && e.type == "Exec") bTypePass = true;

            if (bTypePass && (e.name.toLowerCase().match(pattern) || (bSearchDescription && e.help.toLowerCase().match(pattern))))
                result += "<div>" +
                            "<div>" + e.type + "</div>" +
                            "<div>" + e.name + "</div>" +
                            "<div>" + e.help.replaceAll("\n", "<br>") + "</div>" +
                            "</div>";
        });
        if (result.length == 0)
        {
            result = "🤔";
        }
        heById("sr-list").innerHTML = result;
    }, 750);
}

function onUsePreset(reg)
{
    heById("si-pattern").value = reg;
    onStartSearch();
}

setTimeout(function()
{
    _uevList.forEach(e =>
    {
        heById("uev-list").innerHTML += "<div><input type=\"radio\" name=\"uever\">" + e.display + "</div>";
    });
    heByName("uever").forEach((e, i) =>
    {
        if (i == 0)
            e.checked = true;
        e.onchange = onStartSearch;
    });
    ["so-variable", "so-command", "so-exec", "so-description"].forEach(e =>
    {
        heById(e).onchange = onStartSearch;
    });
    _pcvarList.forEach(e =>
    {
        heById("pcvar-list").innerHTML += "<div><li class=\"lv" + e.displayLv + "\" onclick=\"onUsePreset('" + e.reg.replaceAll("\\", "\\\\") + "')\">" + e.display + "</li></div>";
    });
    heById("si-pattern").oninput = onStartSearch;

    onStartSearch();
}, 500);
