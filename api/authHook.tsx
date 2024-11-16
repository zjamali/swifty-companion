import { OAuthTokenResponse } from '@/constants/types';
import { useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Updates from "expo-updates";



export default function useAuth() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const apiClientId = process.env.EXPO_PUBLIC_API_CLIENT;
    const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;
    const redirectUrl = process.env.EXPO_PUBLIC_REDIRECT_URL;

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: apiClientId!,
            redirectUri: redirectUrl!,
        },
        {
            authorizationEndpoint: `${apiUrl}/oauth/authorize`,
        }
    );


    async function exchangeAccessToken(code: string) {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', apiClientId!);
        params.append('client_secret', apiSecret!);
        params.append('code', code);
        params.append('redirect_uri', redirectUrl!);


        try {
            const oAuthTokenResponse: OAuthTokenResponse = await fetch(`${apiUrl}/oauth/token?` + params.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(response => {
                return response.json();
            })
            return { ...oAuthTokenResponse, expires_in: new Date().getTime() + oAuthTokenResponse.expires_in * 1000 };
        } catch (error) {
            console.log("error : ", error);
        }
    }

    useEffect(() => {
        if (response && response.type === 'success') {
            (async () => {
                const result = await exchangeAccessToken(response?.params?.code);
                await SecureStore.setItemAsync("token", JSON.stringify(result));
                Updates.reloadAsync();
            })();
        }
    }, [response])

    return [promptAsync];
}