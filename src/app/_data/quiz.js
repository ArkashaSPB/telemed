const quiz = [


    {
        id: "intro",
        title: "Выявление респираторно-вирусного заболевания",
        subtitle: "Какие симптомы вы испытываете?",
        questions: [
            {
                id: "symptoms",
                type: "checkbox",
                required: true,
                optionsPerRow: 1,
                options: [
                    { value: "fever", label: "Повышенная температура" },
                    { value: "cough", label: "Кашель" },
                    { value: "fatigue", label: "Слабость" },
                    { value: "headache", label: "Головная боль" },
                    { value: "sore_throat", label: "Боль в горле" },
                    { value: "other", label: "Другое", other: true, placeholder: "Укажите" }
                ],
            },
        ],
    },

    {
        id: "surgery",
        title: "Были гинекологические операции?",
        questions: [
            {
                id: "had_surgery",
                type: "radio",                    // одиночный выбор
                required: true,
                options: [
                    { value: "yes", label: "Да" },
                    { value: "no", label: "Нет" },
                ],
            },
        ],
    },

    {
        id: "notes",
        title: "Дополнительная информация для врача",
        questions: [
            {
                id: "comment",
                type: "textarea",                 // многострочный ввод
                placeholder: "Опишите самочувствие, лекарства, аллергии...",
                required: false,
                maxLength: 800,
            },
        ],
    },

    {
        id: "smell",

        title: "Зрительная память",

        questions: [
            {
                id: "memory_words",
                type: "chips",
                title: "Зрительная память",
                optionsText:"Положите перед собой часы. Подготовьте для опрашиваемого листс 25 словами из данного вопроса. В течении 1 минуты попросите прочесть и запомнить как можно больше слов. Уберите лист со словами. Через 5 минут попросите воспроизвести слова с листа в любом порядке.",// «кнопки-метки»
                required: false,
                optionsPerRow: 3,
                options: [
                    "Лимон", "Мёд", "Имбирь", "Мандарины",
                    "Персик", "Груша", "Кедр", "Хлеб",
                    "Корица", "Гвоздика", "Сливки", "Сосна"
                ].map(x => ({value: x, label: x})),
            }
        ],
    },

    {
        id: "final",
        title: "Готово",
        questions: [
            {
                id: "consent",
                type: "checkbox-one",             // чекбокс-согласие
                required: true,
                label: "Согласен на обработку персональных данных",
                value: true,
            },
        ],
        isLast: true,
    },
];

export default quiz;
