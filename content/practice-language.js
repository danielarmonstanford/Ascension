export const fullBodyPractice = {
  en: {
    introduction: "Diện Chẩn is a modern Vietnamese, needle-free reflexology and acupressure approach. Within Y sĩ Huỳnh Bảo Loan’s broader Traditional Vietnamese Medicine practice, it may be complemented by full-body acupressure, therapeutic heat, assisted stretching and manual bodywork, according to individual assessment.",
    frameworks: "In Loan’s broader practice, Kinh Mạch meridian pathways, Cạo Gió treatment routes and Bấm Huyệt points are traditional frameworks that may inform practitioner-led full-body work. They are not presented as established biological mechanisms.",
    label: "Kinh Mạch · Cạo Gió · Bấm Huyệt",
  },
  fr: {
    introduction: "Le Diện Chẩn est une approche vietnamienne moderne, sans aiguilles, de réflexologie et d’acupression. Dans le cadre plus large de la pratique de médecine traditionnelle vietnamienne de Y sĩ Huỳnh Bảo Loan, il peut être complété par l’acupression du corps entier, la chaleur thérapeutique, les étirements assistés et le travail manuel, selon l’évaluation individuelle.",
    frameworks: "Dans la pratique plus large de Loan, les voies méridiennes Kinh Mạch, les parcours de Cạo Gió et les points de Bấm Huyệt sont des cadres traditionnels pouvant guider un travail corporel mené par une praticienne. Ils ne sont pas présentés comme des mécanismes biologiques établis.",
    label: "Kinh Mạch · Cạo Gió · Bấm Huyệt",
  },
  vi: {
    introduction: "Diện Chẩn là phương pháp phản xạ học và day ấn huyệt hiện đại của Việt Nam, không dùng kim. Trong thực hành Y học cổ truyền Việt Nam rộng hơn của Y sĩ Huỳnh Bảo Loan, phương pháp này có thể được bổ trợ bằng day ấn toàn thân, nhiệt trị liệu, kéo giãn có hỗ trợ và thao tác thủ công, tùy theo đánh giá của người thực hành đối với từng cá nhân.",
    frameworks: "Trong thực hành rộng hơn của Loan, các đường kinh Kinh Mạch, lộ trình Cạo Gió và huyệt Bấm Huyệt là những khuôn khổ truyền thống có thể định hướng công việc toàn thân do người thực hành dẫn dắt. Chúng không được trình bày như các cơ chế sinh học đã được thiết lập.",
    label: "Kinh Mạch · Cạo Gió · Bấm Huyệt",
  },
  ko: {
    introduction: "디엔쩐은 현대 베트남의 바늘 없는 반사요법 및 지압 접근법입니다. Y sĩ Huỳnh Bảo Loan의 더 넓은 베트남 전통의학 실천 안에서는 개인별 평가에 따라 전신 지압, 치료적 온열, 보조 스트레칭 및 수기 바디워크가 함께 이루어질 수 있습니다.",
    frameworks: "Loan의 더 넓은 실천에서 Kinh Mạch 경락 경로, Cạo Gió 치료 경로와 Bấm Huyệt 지점은 실천가 주도의 전신 작업에 참고될 수 있는 전통적 틀입니다. 이는 확립된 생물학적 기전으로 제시되지 않습니다.",
    label: "Kinh Mạch · Cạo Gió · Bấm Huyệt",
  },
  "zh-hans": {
    introduction: "面诊是一种现代越南无针反射疗法与指压方法。在Y sĩ Huỳnh Bảo Loan更广泛的越南传统医学实践中，可根据个体评估配合全身指压、热疗、辅助拉伸与手法身体工作。",
    frameworks: "在Loan更广泛的实践中，Kinh Mạch经络路径、Cạo Gió疗法路线和Bấm Huyệt穴位属于可为实践者主导的全身工作提供参考的传统框架；本网站不将其表述为已确立的生物学机制。",
    label: "Kinh Mạch · Cạo Gió · Bấm Huyệt",
  },
};

export function getFullBodyPractice(locale = "en") {
  return fullBodyPractice[locale] || fullBodyPractice.en;
}
