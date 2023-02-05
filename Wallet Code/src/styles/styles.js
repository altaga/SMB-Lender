import { Dimensions, StyleSheet } from 'react-native';
import { contentColor } from '../envs/env-production';

const GlobalStyles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    container2: {
        flex: 1,
        alignItems: "center"
    },
    containerBox: {
        flex: 1,
    },
    // Static Components
    header:{
        height:"12%",
        borderBottomWidth:1,
        borderBottomColor:contentColor
    },
    footer:{
        height:"12%",
        width:"98%",
        margin:"1%",
        borderRadius:100,
        backgroundColor:contentColor
    },
    // Components
    button: {
        borderRadius: 100,
        backgroundColor: contentColor,
        padding: 10,
        width: "80%"
    },
    buttonDisabled: {
        borderRadius: 100,
        backgroundColor: contentColor+"77",
        padding: 10,
        width: "80%"
    },
    buttonText:{
        color:"white",
        fontSize:24,
        textAlign:"center",
        fontFamily: "Helvetica",
        textShadowColor:"black",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius:6
    },
    simpleText:{
        color:"black",
        textAlign:"center",
        fontFamily: "Helvetica",
        width:"96%"
    },
    simpleTextPhrase:{
        color:"black",
        fontSize:24,
        textAlign:"center",
        fontFamily: "Helvetica"
    }
});

export default GlobalStyles;