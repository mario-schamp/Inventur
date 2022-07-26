(function () {
    var customRenderingOverride = {};
    customRenderingOverride.Templates = {};
    customRenderingOverride.Templates.Fields = {
        "Versicherung": { "View": renderVersicherung }, 
        "Standort": { "View": renderStandort },
        "DATEV": { "View": renderDATEV },
        "Modell": { "View": renderModell },
        "Seriennummer": { "View": renderSeriennummer },
        "Toner": { "View": renderToner },
        "Garantie": { "View": renderGarantie },
    }

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(customRenderingOverride);
})();

function renderStandort(ctx) {
    var standortValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (standortValue == "Nicht gesetzt") {
        return "<span style='color:red'>" + standortValue + "</span>"
    }
    else {
        return standortValue;
    }
}

// Wenn kein DATEV beschrieben wurde, dann ist das Feld default rot
function renderDATEV(ctx) {
    var datevValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (datevValue == "Nicht gelistet") {
        return "Es wurde kein Wert ausgewählt!"
    }
    else {
        return datevValue;
    }
}

// Wenn kein Modell angegeben wurde, dann ist das Feld default rot
function renderModell(ctx) {
    var modellValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (modellValue == "Kein Modell ausgewählt") {
        return "<span style='color:red'>" + modellValue + "</span>"
    }
    else {
        return modellValue;
    }
}

// Wenn keine Seriennummer angegeben wurde, dann ist das Feld default rot
function renderSeriennummer(ctx) {
    var seriennummerValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (seriennummerValue == "Bitte Seriennummer angegeben") {
        return "<span style='color:red'>" + seriennummerValue + "</span>"
    }
    else {
        return seriennummerValue;
    }
}

//Wenn bei einem Gerät kein Toner ausgewählt wurde, dann ist das Feld default rot
function renderToner(ctx) {
    var tonerValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (tonerValue == "Kein Toner") {
        return "<span style='color:white'>" + tonerValue + "</span>"
    }
    else {
        return tonerValue;
    }
}

// überprüft ob die Garantie noch gültig ist oder nicht, wenn ja, dann ist das Datum grün, wenn nicht, dann ist das Datum rot.
    function renderGarantie(ctx) {
    var garantieValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    var garantieDatum = garantieValue.split(".").reverse().join("-");
    const garantieDatumJetzt = new Date(garantieDatum).getTime();
    var datum = new Date();
    const heute = datum.getTime();

    if (garantieDatumJetzt < heute) {
        return "<span style='color:red'>" + "Garantie Abgelaufen am: " + garantieValue + "</span>"
    }
    else {
        return "<span style='color:green'>" + garantieValue + "</span>"
    }
}

function renderVersicherung(ctx) {
    var versicherungValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (versicherungValue == "Keine vorhanden") {
        return "<span style='color:red'>" + versicherungValue + "</span>"
    }
    else {
        return versicherungValue;
    }
}