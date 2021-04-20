import React,{useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import LikeCard from '../components/LikeCard';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"

export default function LikePage({navigation,route}){
    
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    
    useEffect(()=>{
        navigation.setOptions({
            title:'꿀팁 찜'
        })
        const user_id = Constants.installationId;
        firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
            console.log("파이어베이스에서 데이터 가져왔습니다!!")
            let tip = snapshot.val();
            console.log(tip)
            let tip_list = Object.values(tip)
            if(tip_list.length > 0){exp
                setTip(tip_list)
                setReady(false)
            }
           
        })
    },[])

    //LikePage에서 찜 해제를 누르면, reload 함수가 실행되어 Page -> Card로 상태를 넘겨준다.
    //이 상태는, 찜 해제가 완료된 그 상태로, 변화된 상태가 그대로 넘겨받아 화면에 구현된다.
    const reload = () =>{
        const user_id = Constants.installationId;
        firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
						//snapshot에 값이 있는지 없는지 체크하는 exists 함수 사용
            if(snapshot.exists()){
                let tip = snapshot.val();
                let tip_list = Object.values(tip)
                setTip(tip_list)
            }else{
                setReady(true)
                setTip([])
            }
            
        })
    }

    return ready ? <Loading/> : (
        <ScrollView style={styles.container}>
           {
               tip.map((content,i)=>{
                   return(<LikeCard key={i} reload={reload} content={content} navigation={navigation}/>)
               })
           }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})