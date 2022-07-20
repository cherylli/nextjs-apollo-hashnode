import {ApolloClient,InMemoryCache} from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://api.hashnode.com/',
    cache: new InMemoryCache()
})

export default apolloClient;