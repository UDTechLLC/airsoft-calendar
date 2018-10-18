const gameTypeColor = type => {
  switch (type) {
    case 'Игра выходного дня':
      return '#fff';
    case 'Позиционная':
      return '#e89361';
    case 'Штурм-Оборона':
      return '#86cef2';
    case 'Противостояние':
      return '#fff47e';
    case 'CQB':
      return '#f4c792';
    case 'Антитеррор':
      return '#b58fbc';
    case 'Реконструкция':
      return '#9f7e58';
    case 'Фаер Тимы':
      return '#e16d38';
    case 'Рейд':
      return '#99c455';
    case 'Ночная':
      return '#58b8b3';
    case 'Ролевая':
      return '#ffc809';
    default:
      return 'rgba(162, 162, 162)';
  }
};

export default gameTypeColor;
