const calcTime = (timestamp) => {
  // 한국시간 UTC + 9시간
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  //['a','b','c'].reverse()
  //=['c','b','a']
  data
    .sort((a, b) => a)
    .reverse()
    .forEach(async (obj) => {
      const div = document.createElement("div");
      div.className = "item-list";

      const imgDiv = document.createElement("div");
      imgDiv.className = "item-list__img";

      //이미지 불러오기
      const img = document.createElement("img");
      const res = await fetch(`/images/${obj.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      img.src = url;

      const InfoDiv = document.createElement("div");
      InfoDiv.className = "item-list__info";

      const InfoTitleDiv = document.createElement("div");
      InfoTitleDiv.className = "item-list__info-title";
      InfoTitleDiv.innerText = obj.title;

      const InfoMetaDiv = document.createElement("div");
      InfoMetaDiv.className = "item-list__info-meta";
      InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

      const InfoPriceDiv = document.createElement("div");
      InfoPriceDiv.className = "item-list__info-price";
      InfoPriceDiv.innerText = obj.price;

      imgDiv.appendChild(img);
      InfoDiv.appendChild(InfoTitleDiv);
      InfoDiv.appendChild(InfoMetaDiv);
      InfoDiv.appendChild(InfoPriceDiv);
      div.appendChild(imgDiv);
      div.appendChild(InfoDiv);
      main.appendChild(div);
    });
};

const fetchList = async () => {
  const accessToken = window.localStorage.getTime("token");
  const res = await fetch("/items", {
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 401) {
    alert("로그인이 필요합니다");
    window.location.pathname = "/login.html";
    return;
  }

  const data = await res.json();
  renderData(data);
};

fetchList();
