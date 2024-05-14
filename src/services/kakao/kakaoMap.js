const kakaoMaps = window.kakao.maps;
export const kakaoMap = (latitude, longitude) => {

  if (kakaoMaps) {
    const container = document.getElementById('map');
    const options = {
      center: new kakaoMaps.LatLng(latitude, longitude),
      level: 3
    };
    const map = new kakaoMaps.Map(container, options);
    return map
  }
  return null;
}

export const viewMap = (trade, mapRef, setAddressInfo) => {
  const map = kakaoMap(trade.latitude, trade.longitude);

  if (!map) {
    console.error('카카오맵 API가 로드되지 않았습니다.');
    return;
  }

  mapRef.current = map;

  const marker = new kakaoMaps.Marker({
    position: map.getCenter()
  });

  const geocoder = new kakaoMaps.services.Geocoder();

  const updateAddressInfo = () => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      geocoder.coord2Address(trade.longitude, trade.latitude,
          (result, status) => {
            if (status === kakaoMaps.services.Status.OK) {
              const address = result[0]?.road_address?.address_name
                  || '장소를 표시할 수 없습니다.';
              setAddressInfo(address);
            } else {
              setAddressInfo('주소를 가져올 수 없습니다.');
            }
          });
    }
  };
  updateAddressInfo();
  map.setDraggable(false);
  map.setZoomable(false);
  marker.setMap(map);
};

export const moveMarker = (latitude, longitude) => {
  const map = kakaoMap(latitude, longitude);

  if (!map) {
    console.error('카카오맵 API가 로드되지 않았습니다.');
    return;
  }
  const markerPosition = new kakaoMaps.LatLng(latitude, longitude);
  const marker = new kakaoMaps.Marker({
    position: markerPosition,
    draggable: true // 드래그 가능하도록 설정
  });
  marker.setMap(map);
}