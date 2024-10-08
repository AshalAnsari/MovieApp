import React from 'react';
import { View , StyleSheet , Text, TouchableOpacity , Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get("window")

function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate("Movie", item);
    }

    return (
        <View>
            <Text style={styles.text}>Trending Movies</Text>
            <Carousel
                data={data}
                renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{display:"flex", alignItems:"center"}}
            />
        </View>
    );
}

const MovieCard = ({item , handleClick}) => {
    return (
        <TouchableOpacity onPress={() => handleClick(item)}>
            <Image
                source={{uri: image500(item.poster_path)}}
                style={{
                    width:width * 0.6,
                    height: height*0.4,
                    borderRadius:20,
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    text:{
        color:"white",
        fontSize:20,
        marginVertical:30,
        marginLeft:10,
        fontWeight:"bold",
    }
});

export default TrendingMovies;