import { StyleSheet } from "react-native";
export const globalstyles = StyleSheet.create({
    form:{
        paddingHorizontal:20,
        marginVertical:20,
        borderRadius:8,
        width:'98%',
        alignSelf:'center',
        paddingVertical:20,
        backgroundColor:'#fff'
    },
    card:{
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal:20,
        backgroundColor: "#fff",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        alignSelf: "center",
        width: "98%"
    },
    modalContainer:{
      minHeight:100,
      display:'flex',
      paddingHorizontal:5,
      marginTop:20,
      top:0,
      left:0,
      width:'90%',
      alignSelf:'center'
  },
  modalHeader:{
      textAlign:'center',
      fontWeight:'500',
      paddingVertical:5,
      fontSize:19,
      color:'#555'
  },
  modalContent:{
      fontWeight:'500',
      fontSize:14,
      paddingTop:10,
      color:'#555'
  },
  modalIcon:{
      paddingTop:40,
  },
    spaceVertical:{
      marginVertical:8
    },
    spaceHorizontal:{
        marginHorizontal:8
      },
    column:{

        display: 'flex',
        flexDirection:'column',
    },
    safeArea:{
        flex:1
    },
    columnCenter:{
        
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    columnEnd:{
        display: 'flex',
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'flex-end' 
       },
    columnStart:{
        display: 'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start' 
       },
    row:{
        display: 'flex',
        flexDirection:'row'
    },
   rowEven : {
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'

    },
    rowWide:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowNarrow:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    inputNoBorder:{
        borderBottomWidth:1,
        borderBottomColor: 'gray',
        paddingBottom:5
    },
    inputBorder: {
        height: 44,
        textAlign: "center",
        marginTop: 30,
        width: 280,
        borderColor: "#777",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 20,
      },
    error:{
        color:'red'
    },
    textSmall:{
        fontSize:13,
        fontWeight:'500',
        color:'#555'
    },
   
    date:{
        fontWeight:'500',
        color:'green',
        fontSize:14
    },
    dropdown:{
        width:180,
        marginHorizontal:-24
    },
    pickerItemLabel: {
        fontSize: 16, 
        textAlign:'center'
      },
      pickerItemHeader: {
        fontSize: 11, 
        color:'#444'
      },
    line:{
        borderBottomColor:'#111',
        width:100,
        height:1,
        marginVertical:10,
        alignSelf:'center',
        borderBottomWidth:1
    },
    center:{
        textAlign:'center',
        fontWeight:'500',
        color:'#555'
    },
    headerMedium:{
        fontSize:19,
        fontWeight:'500',
        color:'#444'
    },
    bold:{
        fontWeight:'600'
    },
    headerBig:{
        fontSize:21,
        fontWeight:'500',
        color:'#222'
    },
    headerNormal:{
        fontSize:17,
        fontWeight:'500',
        color:'#222'
    },
    headerSmall:{
        fontSize:13,
        fontWeight:'500',
    },
    button:{
        borderRadius:20,
        backgroundColor:'green',
        width:250,
        alignSelf:'center',
        height:40
    },
    buttonText:{
        paddingTop:10,
        color:'#fff',
        fontWeight:'500',
        textAlign:'center'
    },
    centeredText:{
        textAlign:'center'
    },
    card_Header:{
        fontWeight:'500',
        fontSize:13,
        color:'#333'
    },
    card_Content:{
        paddingVertical:10,
        fontSize:11,
        color:'#333',
        fontWeight:'400'
    },
    wrap:{
        flexWrap:'wrap'
    }
    ,circleVerySmall: {
        width: 20,
        height: 20,
        marginBottom:10,
        borderRadius: 10,
        borderWidth: 2,
      },
      completed: {
        borderColor: 'green', // green color for approved state
      },
      active: {
        borderColor: '#ffa500', // orange color for active state
      },
      current: {
        borderColor: '#000000', // black color for current state circle border
      },
      confirmed:{
        borderColor:'#4d79ff'
      },
      declined:{
        borderColor:'red'
      },
      orderContainer:{
        width:'96%',
        alignSelf:'center',
        borderRadius:8,
        borderColor:'#fff',
        borderWidth:1,
        flex:1,
        height:210,
        marginVertical:20
      },
    orderImageContainer:{
        width:'70%',
        height:'100%',
        opacity: 0.8,
      },
      orderContainerInner:{
        flex:1,
        height:250,
        width:290,
        alignSelf:'center'
      },
      logo: {
        borderRadius:50,
        width:80,
        height:80
      },
      logoContainer:{
        paddingVertical:30
      },
      link:{
        color:'green',
        textAlign:'center',
      },
      formContainer:{
       display:'flex',
       flex:1,
       width:'100%',
       height:'100%',
       flexDirection:'column',
       justifyContent:'center',
        alignSelf:'center'
      }
      ,   // Roads Starts Here
    searchContainer:{
        marginHorizontal:'5%',
        display:'flex',
        overflow:'hidden',
        flexDirection:'row',
        alignSelf:'center',
        width:280,
        height:35,
        borderColor:'#888',
        borderWidth:1,
        borderRadius:20
    },
    searchBar:{
        width:250,
        alignSelf:'center',
        paddingLeft:20,
        height:33
    },
          // Employee starts here
     profile: {
        width: 50,
        height: 50,
      },
      avatar:{
         width:240,
        height:240,
        borderRadius:120,
      },
    
      imageContainer:{
        marginTop:20,
        width:240,
        height:240,
        borderRadius:120,
      },
      drawerContent:{
        marginVertical:2,
        paddingHorizontal:10
      },
      drawerContainer:{
        minHeight:250,
        display:'flex',
        paddingHorizontal:5,
        bottom: -5,
        position:'absolute',
        width:'98%',
        backgroundColor:'rgba(255,255,255,0.8)',
        alignSelf:'center'
      }
});















