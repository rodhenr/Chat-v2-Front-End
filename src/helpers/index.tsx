interface Messages {
  createdAt: string;
  message: string;
  read: boolean;
  receiver: string;
  sender: string;
}

interface DataConnection {
  avatar: string;
  fullName: string;
  message: Messages;
  notRead: number;
  userId: string;
}

export function checkMonth(m: number) {
  switch (m) {
    case 0:
      return "Janeiro";
    case 1:
      return "Fevereiro";
    case 2:
      return "Março";
    case 3:
      return "Abril";
    case 4:
      return "Maio";
    case 5:
      return "Junho";
    case 6:
      return "Julho";
    case 7:
      return "Agosto";
    case 8:
      return "Setembro";
    case 9:
      return "Outubro";
    case 10:
      return "Novembro";
    case 11:
      return "Dezembro";
  }
}

export function getMessageDate(created: Date) {
  const newDate = new Date(created);
  const dateHours = newDate.getHours();
  const dateMinutes = newDate.getMinutes();
  const dateMonth = newDate.getMonth();
  const dateDay = newDate.getDate();
  const dateYear = newDate.getFullYear();
  const date = `${newDate.getDate()}${newDate.getMonth()}`;

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const dateToday = `${today.getDate()}${today.getMonth()}`;

  if (dateToday === date) {
    if (dateHours < 10 && dateMinutes < 10) {
      return `0${dateHours}:0${dateMinutes}`;
    } else if (dateHours < 10) {
      return `0${dateHours}:${dateMinutes}`;
    } else if (dateMinutes < 10) {
      return `${dateHours}:0${dateMinutes}`;
    } else {
      return `${dateHours}:${dateMinutes}`;
    }
  } else if (todayMonth === dateMonth && todayDay - 1 === dateDay) {
    return "Ontem";
  } else if (todayMonth - 1 === dateMonth && todayDay - 1 === 0) {
    return "Ontem";
  } else if (todayMonth - 1 === -1 && todayDay - 1 === 0) {
    return "Ontem";
  } else {
    return `${dateDay}/${dateMonth + 1}/${dateYear}`;
  }
}

export function sortMessagesData(data: DataConnection[]) {
  const sortedArray = data.slice().sort((a, b) => {
    const itemA: DataConnection | null =
      Object.keys(a.message).length > 0
        ? JSON.parse(a.message.createdAt)
        : null;
    const itemB: DataConnection | null =
      Object.keys(b.message).length > 0
        ? JSON.parse(b.message.createdAt)
        : null;

    if (!itemA) {
      return 1;
    } else if (!itemB) {
      return -1;
    } else {
      return itemA < itemB ? 1 : itemA > itemB ? -1 : 0;
    }
  });

  return sortedArray;
}

// Width da janela
export function getWindowSize() {
  const width = window.innerWidth;
  return width;
}