function doGet() {
}

function doPost(e) {
    let params = JSON.parse(e['postData']['contents']);
    let res = {status: null, message: ''};
    try {
        let spreadsheet = SpreadsheetApp.openById('1k18vTJCpC_-W-suP3KHokHlVpLeARjjsLlM1WAmrfQ8');
        let sheet = spreadsheet.getSheetByName('企画・評価部門');
        sheet.getRange('X5').setValue(params['drag_coefficient']);
        sheet.getRange('X6').setValue(params['weight_goal']);
        sheet.getRange('X7').setValue(params['budget']);
        sheet.getRange('X10').setValue(params['basic_shape']);
        sheet.getRange('X11').setValue(params['material']);
        sheet.getRange('X12').setValue(params['rf_board_thickness']);
        sheet.getRange('X13').setValue(params['point_spacing']);
        sheet.getRange('X14').setValue(params['length_l']);
        sheet.getRange('X15').setValue(params['angle_t']);
        sheet.getRange('X16').setValue(params['presence_or_absence_of_holes']);
        sheet.getRange('X17').setValue(params['angle_a']);
        let backdoor_strength = sheet.getRange('Q5').getValue();
        let natural_frequency = sheet.getRange('Q6').getValue();
        let gross_weight = sheet.getRange('Q7').getValue();
        let drag_coefficient = sheet.getRange('Q8').getValue();
        let fuel_economy = sheet.getRange('Q9').getValue();
        let expected_monthly_unit_sales = sheet.getRange('Q10').getValue();
        let T12 = sheet.getRange('T12').getValue();
        let T13 = sheet.getRange('T13').getValue();
        let T14 = sheet.getRange('T14').getValue();
        let T15 = sheet.getRange('T15').getValue();
        let T16 = sheet.getRange('T16').getValue();
        let T17 = sheet.getRange('T17').getValue();
        let S20 = sheet.getRange('S20').getValue();
        let S21 = sheet.getRange('S21').getValue();
        let S22 = sheet.getRange('S22').getValue();
        let S23 = sheet.getRange('S23').getValue();
        let S24 = sheet.getRange('S24').getValue();
        let S25 = sheet.getRange('S25').getValue();


        sheet = spreadsheet.getSheetByName('生産部門');


        sheet.getRange('Q5').setValue(params['basic_shape']);
        sheet.getRange('Q6').setValue(params['material']);
        sheet.getRange('Q7').setValue(params['rf_board_thickness']);
        sheet.getRange('Q8').setValue(params['point_spacing']);
        sheet.getRange('Q9').setValue(params['length_l']);
        sheet.getRange('Q10').setValue(params['angle_t']);
        sheet.getRange('Q11').setValue(params['presence_or_absence_of_holes']);
        sheet.getRange('Q12').setValue(params['angle_a']);

        sheet.getRange('Q16').setValue(params['Q16']);
        sheet.getRange('Q17').setValue(params['Q17']);
        sheet.getRange('Q18').setValue(params['Q18']);
        sheet.getRange('Q19').setValue(params['Q19']);
        sheet.getRange('Q20').setValue(params['Q20']);
        sheet.getRange('Q21').setValue(params['Q21']);
        sheet.getRange('Q22').setValue(params['Q22']);
        sheet.getRange('Q23').setValue(params['Q23']);
        sheet.getRange('Q24').setValue(params['Q24']);
        sheet.getRange('Q25').setValue(params['Q25']);
        sheet.getRange('Q26').setValue(params['Q26']);
        sheet.getRange('Q27').setValue(params['Q27']);
        sheet.getRange('Q28').setValue(params['Q28']);
        sheet.getRange('Q29').setValue(params['Q29']);

        sheet.getRange('R16').setValue(params['R16']);
        sheet.getRange('R17').setValue(params['R17']);
        sheet.getRange('R18').setValue(params['R18']);
        sheet.getRange('R19').setValue(params['R19']);
        sheet.getRange('R20').setValue(params['R20']);
        sheet.getRange('R21').setValue(params['R21']);
        sheet.getRange('R22').setValue(params['R22']);
        sheet.getRange('R23').setValue(params['R23']);
        sheet.getRange('R24').setValue(params['R24']);
        sheet.getRange('R25').setValue(params['R25']);
        sheet.getRange('R26').setValue(params['R26']);
        sheet.getRange('R27').setValue(params['R27']);
        sheet.getRange('R28').setValue(params['R28']);
        sheet.getRange('R29').setValue(params['R29']);

        sheet.getRange('R31').setValue(params['R31']);
        sheet.getRange('R32').setValue(params['R32']);
        sheet.getRange('R33').setValue(params['R33']);
        sheet.getRange('R34').setValue(params['R34']);
        sheet.getRange('R35').setValue(params['R35']);
        sheet.getRange('R36').setValue(params['R36']);
        sheet.getRange('R37').setValue(params['R37']);
        sheet.getRange('R38').setValue(params['R38']);

        sheet.getRange('S32').setValue(params['S32']);


        let P10 = sheet.getRange('P10').getValue();
        let P11 = sheet.getRange('P11').getValue();
        let P12 = sheet.getRange('P12').getValue();
        let P13 = sheet.getRange('P13').getValue();
        let R70 = sheet.getRange('R70').getValue();
        let R71 = sheet.getRange('R71').getValue();
        let R72 = sheet.getRange('R72').getValue();


        let values = {
            backdoor_strength: backdoor_strength,
            natural_frequency: natural_frequency,
            gross_weight: gross_weight,
            drag_coefficient: drag_coefficient,
            fuel_economy: fuel_economy,
            expected_monthly_unit_sales: expected_monthly_unit_sales,
            T12: T12,
            T13: T13,
            T14: T14,
            T15: T15,
            T16: T16,
            T17: T17,
            S20: S20,
            S21: S21,
            S22: S22,
            S23: S23,
            S24: S24,
            S25: S25,

            P10:P10,
            P11:P11,
            P12:P12,
            P13:P13,

            R70:R70,
            R71:R71,
            R72:R72,
        }
        if (values) {
            res['value'] = values;
            res['message'] = 'success';
        } else {
            res['value'] = null;
            res['message'] = 'no data.';
        }
        res['status'] = 200;
    } catch (e) {
        res['status'] = 500;
        res['message'] = e;
    }
    let data = JSON.stringify(res);
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}