import React from 'react';
import CollectionRequest from '../../components/Creators/CollectionRequests/CollectionRequest';
import CreatorRequest from '../../components/Creators/CreatorRequest/CreatorRequest';
import Header from '../../components/Header/Header';

const Creators = () => {
    return (
        <>
        <Header/>
            <div>
                <CreatorRequest/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <CollectionRequest/>
            </div>
            
        </>
    );
};

export default Creators;