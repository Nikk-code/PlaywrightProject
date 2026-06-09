module.exports = {
    default: {
        require: [
            'features/step_defination/**/*.js',
            'features/support/**/*.js'
        ]
    }
};

// npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
// npx cucumber - js--tags "@Validation" --exit
//npx cucumber-js --tags "@Validation" --retry 1 --exit --format html:cucumber-report.html