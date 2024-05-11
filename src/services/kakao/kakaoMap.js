const kakaoMap = (trade, mapRef, setAddressInfo) => {
    const kakaoMaps = window.kakao.maps;

    if (trade && kakaoMaps) {
        const container = document.getElementById('map');
        const options = {
            center: new kakaoMaps.LatLng(trade.latitude, trade.longitude),
            level: 3
        };
        const map = new kakaoMaps.Map(container, options);
        mapRef.current = map;

        const marker = new kakaoMaps.Marker({
            position: options.center
        });

        const geocoder = new kakaoMaps.services.Geocoder();

        const updateAddressInfo = () => {
            const mapInstance = mapRef.current;
            if (mapInstance) {
                geocoder.coord2Address(trade.longitude, trade.latitude, (result, status) => {
                    if (status === kakaoMaps.services.Status.OK) {
                        const address = result[0]?.road_address?.address_name || '장소를 표시할 수 없습니다.';
                        setAddressInfo(address);
                    }
                });
            }
        };
        updateAddressInfo();
        map.setDraggable(false);
        map.setZoomable(false);
        marker.setMap(map);
    }
};

export default kakaoMap;