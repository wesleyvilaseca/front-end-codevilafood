import Vue from 'vue';

const formatDate = (current_date) => {
    let date = new Date(current_date),
        day = (date.getDate() + 1).toString(),
        dayF = (day.length == 1) ? '0' + day : day,
        month = (date.getMonth() + 1).toString(),
        monthF = (month.length == 1) ? '0' + month : month,
        yearF = date.getFullYear()

    return dayF + "/" + monthF + "/" + yearF
}

const formatPrice = (price) => {
    // return price.toLocaleString('pt-br', { minimumFractionsDigits: 2 });
    let val = (price / 1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
};

Vue.filter('dateformat', formatDate);
Vue.filter('formatPrice', formatPrice);