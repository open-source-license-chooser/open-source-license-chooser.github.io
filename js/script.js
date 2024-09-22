document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('license-form');
    const result = document.getElementById('result');
    const recommendedLicense = document.getElementById('recommended-license');
    const licenseDescription = document.getElementById('license-description');
    const licenseLink = document.getElementById('license-link');
    const resetButton = document.getElementById('reset');
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');

    let currentLang = 'en';
    let translations = {};

    async function loadTranslations() {
        const enResponse = await fetch('locales/en.json');
        const zhResponse = await fetch('locales/zh.json');
        translations = {
            en: await enResponse.json(),
            zh: await zhResponse.json()
        };
        updateLanguage(currentLang);
    }

    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[id]').forEach(element => {
            if (translations[lang][element.id]) {
                element.textContent = translations[lang][element.id];
            }
        });
        document.querySelectorAll('select').forEach(select => {
            select.querySelector('option[value=""]').textContent = translations[lang].pleaseSelect;
            select.querySelector('option[value="yes"]').textContent = translations[lang].yes;
            select.querySelector('option[value="no"]').textContent = translations[lang].no;
        });
    }

    enBtn.addEventListener('click', () => {
        updateLanguage('en');
        enBtn.classList.add('active');
        zhBtn.classList.remove('active');
    });

    zhBtn.addEventListener('click', () => {
        updateLanguage('zh');
        zhBtn.classList.add('active');
        enBtn.classList.remove('active');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const commercial = document.getElementById('commercial').value;
        const modify = document.getElementById('modify').value;
        const distribute = document.getElementById('distribute').value;
        const sublicense = document.getElementById('sublicense').value;
        const privateUse = document.getElementById('private-use').value;
        const patentUse = document.getElementById('patent-use').value;

        let license = '';
        let description = '';
        let link = '';

        if (commercial === 'yes' && modify === 'yes' && distribute === 'yes' && sublicense === 'yes' && privateUse === 'yes' && patentUse === 'no') {
            license = translations[currentLang].mitLicense;
            description = translations[currentLang].mitDescription;
            link = 'https://opensource.org/licenses/MIT';
        } else if (commercial === 'yes' && modify === 'yes' && distribute === 'yes' && sublicense === 'yes' && privateUse === 'yes' && patentUse === 'yes') {
            license = translations[currentLang].apacheLicense;
            description = translations[currentLang].apacheDescription;
            link = 'https://opensource.org/licenses/Apache-2.0';
        } else if (commercial === 'yes' && modify === 'yes' && distribute === 'yes' && sublicense === 'yes' && privateUse === 'yes' && patentUse === 'no') {
            license = translations[currentLang].gplLicense;
            description = translations[currentLang].gplDescription;
            link = 'https://www.gnu.org/licenses/gpl-3.0.en.html';
        } else if (commercial === 'no' && modify === 'no' && distribute === 'yes' && sublicense === 'no' && privateUse === 'yes' && patentUse === 'no') {
            license = translations[currentLang].ccLicense;
            description = translations[currentLang].ccDescription;
            link = 'https://creativecommons.org/licenses/by-nc-nd/3.0/';
        } else if (commercial === 'yes' && modify === 'yes' && distribute === 'yes' && sublicense === 'no' && privateUse === 'yes' && patentUse === 'no') {
            license = translations[currentLang].bsdLicense;
            description = translations[currentLang].bsdDescription;
            link = 'https://opensource.org/licenses/BSD-2-Clause';
        } else {
            license = translations[currentLang].undetermined;
            description = translations[currentLang].undeterminedDescription;
            link = 'https://choosealicense.com/';
        }

        recommendedLicense.textContent = license;
        licenseDescription.textContent = description;
        licenseLink.href = link;
        licenseLink.textContent = translations[currentLang].learnMore;
        form.classList.add('hidden');
        result.classList.remove('hidden');
    });

    resetButton.addEventListener('click', function() {
        form.reset();
        form.classList.remove('hidden');
        result.classList.add('hidden');
    });

    loadTranslations();
});