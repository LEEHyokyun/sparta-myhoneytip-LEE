//About 페이지를 꾸미는데 useEffect 함수안에서 사용한거고
//즉, 화면이 그려지고 가장 먼저 실행이 되어야할 기능들을 기재한것임
//import {useEffct}, statusbar, navigation, route 등 기본적으로 사용해야할 도구들은 작성!

import React, { useEffect } from "react";
//pages 라는, 다른 폴더에서 import하는 것이기 때문에, asset과는 동일 폴더가 아니다.
//../을 통해 다른 폴더에서 불러오도록 해준다.
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AboutPage({ navigation, route }) {
  //불러올 이미지 변수에 저장
  const aboutImage =
    "https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2FaboutImage.png?alt=media&token=13e1c4f6-b802-4975-9773-e305fc7475c4";

  //기본적으로 모든 페이지들을 상태변수화하고, 이에따라 useEffect / 스택내비게이터를 사용하도록 한다.
  useEffect(() => {
    navigation.setOptions({
      title: "소개 페이지",
      headerStyle: {
        backgroundColor: "#1F266A",
        shadowColor: "#1F266A",
      },
      headerTintColor: "#fff",
    });
  }, []);

  return (
    //Image resizeMode={"cover"}는 화면 전체를 대상으로 이미지가 나타나도록!

    <View style={styles.container}>
      {/*상태표시줄에 나타난 기능들이 흰색처리됨*/}
      <StatusBar style="light" />
      <Text style={styles.title}>
        HI! 스파르타코딩 앱개발 반에 오신것을 환영합니다
      </Text>

      <View style={styles.textContainer}>
        <Image
          style={styles.aboutImage}
          source={{ uri: aboutImage }}
          resizeMode={"cover"}
        />
        <Text style={styles.desc01}>
          많은 내용을 간결하게 담아내려 노력했습니다!
        </Text>
        <Text style={styles.desc02}>
          꼭 완주 하셔서 여러분것으로 만들어가시길 바랍니다
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>여러분의 인스타계정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//StyleSheet 속성이 적용되려면, 아래와 같이 style에 대한 정의가 필요하다.
//const styles = StyleSheet.create({}), 본문에 위와 같은 내용을 포함시킨다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F266A",
    alignItems: "center",
  },

  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: "700",
    //위 공간으로 부터 이격

    //container 내부 글자..padding으로 위치조정
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 100,

    color: "#fff",
  },

  textContainer: {
    backgroundColor: "#fff",
    width: 300,
    height: 500,
    borderRadius: 50,
    marginTop: 50,
    justifyContent: "center", //상하로 가운데
    alignItems: "center", //좌우로 가운데(결론은 정가운데)
  },

  aboutImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },

  desc01: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    paddingLeft: 22,
    paddingRight: 22,
  },

  desc02: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    padding: 22,
  },

  button: {
    backgroundColor: "orange",
    padding: 20,
    borderRadius: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
