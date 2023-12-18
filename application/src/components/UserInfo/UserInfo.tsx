import "./UserInfo.scss"
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import {API_ROUTES} from "../../utils/Commons";
import User from "../../models/User.model";

// @ts-ignore
export default function UserInfo({userId}): JSX.Element {
    const [user, setUser] = useState<User>({
        email: "",
        events: [],
        firstName: "",
        lastName: "",
        ownEvents: [],
        username: ""
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: API_ROUTES.USER + `/byId`,
                    data: {
                        userId: userId
                    },
                });
                if (response.status !== 200) {
                    console.log('Something went wrong during getting user [A]: ', response);
                } else {
                    setUser(response.data);
                }
            } catch (err: any) {
                console.log('Something went wrong during getting user[A]: ', err);
            }
        }
        getUser().then(r => r);
    }, [userId]);

    return (
        <section className={"userInfo"}>
            <p>
                {user.firstName} {user.lastName}
            </p>
        </section>
    );
}