import {StyleSheet} from "react-native";
import {COLORS} from "../../utils/consts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
        // alignItems: 'center',
    },
    text: {
        color: COLORS.white,
        margin: 6,
    },
    totalPriceWithStatusWrapper: {
        flexDirection: 'row',
        // alignItems:'center',
        justifyContent: 'space-between'
    },
    totalPriceWrapper: {
        justifyContent: 'center',
        marginBottom: 5,
    },
    mainBlock: {
        backgroundColor: COLORS.lightgray,
        width: '100%',
        marginTop: 20,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
    mainCollapse: {
        backgroundColor: COLORS.lightgray,
    },
    innerMainBlock: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    nameWithPriceWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    totalPricePerUnit: {
        fontSize: 17,
        color: COLORS.black
    },
    addressWrapperBase: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
    addressWrapperReady: {
        backgroundColor: COLORS.gray,
    },
    addressText: {
        color: COLORS.lightgreen,
        fontSize: 20,
        margin: 6
    },
    dateWrapper: {
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 40,
    },
    buttonComplete: {
        backgroundColor: COLORS.green,
        borderTopRightRadius: 10,

    },
    buttonCancel: {
        borderTopLeftRadius: 10,

        backgroundColor: COLORS.red,
    },
    textButton: {
        color: COLORS.white,
        fontSize: 16,
    },
    notReadyStatusWrapper: {
        alignItems: 'center'
    },
    notReadyStatus: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 90,
    },
    canceledStatus: {
        backgroundColor: COLORS.red,
    },
    completedStatus: {
        backgroundColor: COLORS.green,
    },
    statusCancel: {
        backgroundColor: COLORS.red,
    },
    statusComplete: {
        backgroundColor: COLORS.green,
    },
    nameProduct: {
        color: COLORS.lightgreen,
        fontSize: 20,
    },
    noContent: {
        fontSize: 30,
        color: COLORS.lightgray,
        textAlign: 'center',
    },
});