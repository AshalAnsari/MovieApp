import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "@expo/vector-icons/Fontisto"
import { useEffect, useState } from 'react';
import TrendingMovies from '../Component/TrendingMovies';
import MovieList from '../Component/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Component/Loading';
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/moviedb"

export default function HomeScreen() {
  const [trending , setTrending ] = useState([])
  const [upComingMovies , setUpComingMovies ] = useState([])
  const [topRated , setTopRated ] = useState([])
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results){
      setTrending(data.results)
      setLoading(false)
    }
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results){
      setUpComingMovies(data.results)
    }
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results){
      setTopRated(data.results)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <MaterialCommunityIcons name="menu" size={35} color="white"/>
        <Text>
            <Text style={{color:"yellow", fontSize:40, fontWeight:"bold"}}>M</Text><Text style={styles.text}>ovies</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={25} color="white"/>
        </TouchableOpacity>
      </View>

      {
        loading? 
          <Loading/>
        :
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:10}}
          >
            {trending.length>0 && <TrendingMovies data={trending}/>}

            <MovieList title="Upcoming" data={upComingMovies}/>

            <MovieList title="Top Rated" data={topRated}/>
          </ScrollView>
      }   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#333",
  },
  topContainer:{
    marginTop:40,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginHorizontal:10,
  },
  text:{
    color:"white",
    fontSize:40,
    fontWeight:"bold"
  }
});
