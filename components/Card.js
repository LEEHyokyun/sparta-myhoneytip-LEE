import React, { useEffect } from "react";
//Platform 함수도 동일하게 리액트 네이티브 도구, 헤더부분에서 설정필요!!
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  //아래 AdMobInterstitial이 전면광고를 실행시키는 도구
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from "expo-ads-admob";

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Card({ content, navigation }) {
  useEffect(() => {
    // Card.js에 들어오자마자 전면 광고 준비하느라 useEffect에 설정
    //애드몹도 외부 API 이므로 실행 순서를 지키기위해 async/await 사용!
    //안드로이드와 IOS 각각 광고 준비 키가 다르기 때문에 디바이스 성격에 따라 다르게 초기화 시켜줘야 합니다.
    //각 플랫폼에 대한 전면광고 Key
    Platform.OS === "ios"
      ? AdMobInterstitial.setAdUnitID("ca-app-pub-2521868996473895/1158114321")
      : AdMobInterstitial.setAdUnitID("ca-app-pub-2521868996473895/2171172463");

    //광고가 로드될떄의 이벤트, 로직
    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );

    //광고로드가 실패할떄의 이벤트, 로직
    AdMobInterstitial.addEventListener(
      "interstitialDidFailToLoad",
      () => console.log("interstitialDidFailToLoad")
      //광고가 로드된후,
    );
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    //광고가 끝날때의 이벤트, 로직
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      //광고가 끝나면 다음 코드 줄이 실행!
      console.log("interstitialDidClose");
      //디테일 페이지로 최종 이동
      navigation.navigate("DetailPage", { idx: content.idx });
    });
  }, []);

  //카드리스트 하나를 클릭하면 아래 함수가 실행된다
  //아래는 순서가 반드시 지켜져야하기 때문에, async - await 함수가 사용되었다.
  const goDetail = async () => {
    //ServePersonailads : 개인 쿠키를 빅데이터화 하여, 맞춤형 광고가 나타나게끔 한다
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    //애드몹(엑스포 도구) 광고를 나타나게 한다, 말 그대로 실행 그 자체의 역할을 하기위한 함수.
    await AdMobInterstitial.showAdAsync();
  };

  return (
    //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        goDetail();
      }}>
      <Image style={styles.cardImage} source={{ uri: content.image }} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {content.title}
        </Text>
        <Text style={styles.cardDesc} numberOfLines={3}>
          {content.desc}
        </Text>
        <Text style={styles.cardDate}>{content.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardDesc: {
    fontSize: 15,
  },
  cardDate: {
    fontSize: 10,
    color: "#A6A6A6",
  },
});
