import "./UserInfo.scss"
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import {getFromLocalStorage, getUser, useUser} from "../../utils/Commons";
import User from "../../models/User.model";

// @ts-ignore
export default function UserInfo({userId}): JSX.Element {
    const [user, setUser] = useState({});

    async function getCurrentUser(id: string | null): Promise<boolean> {
        return await getUser(id);
    }

    useEffect(() => {
        getCurrentUser(getFromLocalStorage("userId")).then(r => {
            // @ts-ignore
            console.log(r)
        });
    }, []);

    return (
        <section className={"userInfo"}>
            <p>test
            </p>
        </section>
    );
}