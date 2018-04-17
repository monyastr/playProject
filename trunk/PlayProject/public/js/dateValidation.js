function checkDate(date) {
    var today = new Date().toISOString().slice(0, 10);
    if (date.value < today) {
        date.setCustomValidity('Date should be today or later');
    }else {
        date.setCustomValidity('');
    }
}