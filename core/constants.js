//import logo from "/public/logo.svg"

export const SITE_NAME = "Fogapo"
export const HOME_TITLE = "Флагман гарантированных поставщиков"

const DATA = {
    background: "/wave-bg.svg",
    reg_content:
        "Зарегистрируйтесь любым удобным способом ниже или пройдите регистрацию на сайте прямо <a id=\"regLink\" href=\"#registration\" class=\"link\">сейчас</a>",
}

export default DATA

export const QUESTIONS_FORM_DATA = [
    {
        header: "Заполните анкету для участия во встрече",
        name: {
            title: "Как Вас зовут (ФИО)",
            type: "text",
            required: true,
        },
        phone: {
            title: "Телефон",
            type: "tel",
            required: true,
        },
    },
    {
        header: "Заполните анкету для участия в форуме",
        name: {
            title: "Как Вас зовут (ФИО)",
            type: "text",
            required: true,
        },
        organization: {
            title: "Место работы",
            required: true,
            placeholder: "Название организации/физлицо",
        },
        occupation: {
            title: "Род деятельности",
            choices: ["дизайнер/декоратор", "руководитель дизайн студии/арт-директор"],
            type: "select",
            required: true,
        },
        phone: {
            title: "Телефон",
            type: "tel",
            required: true,
        },
        email: {
            title: "E-mail",
            type: "email",
            required: true,
        },
    },
    {
        header: "Заполните анкету для участия в форуме",
        name: {
            title: "Как Вас зовут (ФИО)",
            type: "text",
            required: true,
        },
        organization: {
            title: "Место работы",
            placeholder: "Название организации/физлицо",
            required: true,
        },
        occupation: {
            title: "Род деятельности",
            choices: ["дизайнер/декоратор", "руководитель дизайн студии/арт-директор"],
            type: "select",
            required: true,
        },
        phone: {
            title: "Телефон",
            type: "tel",
            required: true,
        },
        email: {
            title: "E-mail",
            type: "email",
            required: true,
        },
        questions: [
            {
                title: "Изменилось ли количество Ваших клиентов за последнее время?",
                choices: ["нет", "стало меньше", "стало больше", { text: "другое" }],
                type: "radio",
                inline: false,
                required: true,
            },
            {
                title: "Сколько объектов у Вас сейчас в работе?",
                choices: ["0", "1", "2", "более 2-х", "более 5-ти", "более 10-ти"],
                type: "select",
                required: true,
            },
            {
                title: "Как они распределяются по площади (укажите количество)",
                choices: ["до 80", "80 - 150", "от 150"],
                type: "number",
                required: true,
                inline: false,
            },
            {
                title: "Какие это проекты?",
                choices: ["больше частных", "больше общественных", "50 на 50"],
                type: "select",
                required: true,
            },
            {
                title: "Изменились ли потребности Ваших клиентов?",
                choices: [
                    "нет",
                    "Да, клиенты приходят с более масштабными проектами",
                    "Да, проекты приходят с менее масштабными проектами",
                    "Больше вторичных ремонтов",
                    "Больше первичных ремонтов",
                    "Есть проекты на часть помещения",
                    { text: "другое" },
                ],
                type: "radio",
                required: true,
            },
            {
                title: "Изменился ли бюджет в текущих проектах?",
                choices: [
                    "Клиенты пытаются вписаться в прежние цифры и экономят",
                    "Клиенты понимают, что он увеличится и готовы платить",
                    { text: "другое" },
                ],
                type: "radio",
                required: true,
            },
            {
                title: "Возникли ли трудности при комплектации материалами? Если да, то какие",
                choices: [
                    "Нет нужного ассортимента",
                    "Клиент не готов к изменениям в бюджете",
                    "Клиент не готов к изменениям в сроках",
                    { text: "другое" },
                ],
                type: "checkbox",
            },
            {
                title: "Какие дополнительные обучающие семинары/курсы вы хотели бы посетить?",
                choices: [
                    "по продвижение услуг дизайна, повышению стоимости своих услуг",
                    "по повышению квалификации (какие?)",
                    "по работе с персоналом",
                    "по повышению экономической грамотности, налогообложению",
                    "другое (например, ведение переговоров, ораторское искусство и тп)",
                    { text: "другое" },
                ],
                type: "checkbox",
            },
            {
                title: "На Форуме готовится секция от дизайнеров Кирова по обмену опытом в новой реальности. Ответы на какие вопросы вы хотели бы услышать?",
                type: "textarea",
                autocomplete: false,
            },
        ],
    },
]
