import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {

    const  [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://www.bioid.com/wp-content/uploads/face-database-bioid.jpg'
                                }}
                                size={50}
                            />

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Savindu Ekanayake</Title>
                                <Caption style={styles.caption}>Be positive!</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph, styles.caption}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph, styles.caption}>100</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection} >
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Home'
                            onPress={() => {props.navigation.navigate('Home') }}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Profile'
                            onPress={() => { props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Bookmarks'
                            onPress={() => {props.navigation.navigate('Bookmarks') }}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Settings'
                            onPress={() => {props.navigation.navigate('Settings')}}
                        />
                       <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Support'
                            onPress={() => { props.navigation.navigate('Support') }}
                        />
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection} >
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={isDarkTheme} />
                            </View>
                        </View>
                            
                        </TouchableRipple>
                    </Drawer.Section>



                    {/* <Drawer.section title="Preferences" >
                        <TouchableRipple onPress={() => {}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.section> */}
                    
                </View>
            </DrawerContentScrollView>
            
            <Drawer.Section style={styles.bottomDraweSection} >
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label='Sign Out'
                    onPress={() => { }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDraweSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})