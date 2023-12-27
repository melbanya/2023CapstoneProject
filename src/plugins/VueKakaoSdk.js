const VueKakaoSdk = {
  install(app, { apiKey }) {
    app.config.globalProperties.$kakaoMapApi = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
      script.onload = () => {
        kakao.maps.load(() => {
          resolve(kakao.maps);
        });
      };
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }
}

export default VueKakaoSdk;