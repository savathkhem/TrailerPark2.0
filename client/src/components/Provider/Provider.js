import React from "react";
import axios from "axios";


export default class App extends React.Component {
    state = {
       provider: []
    };

    checkStream = () => {
        // console.log('check stream')
        let tempArray = []
        API
            .checkStream(this.props.id)
            .then(response => this.setState({ provider: response.data.US.flatrate }))
            .catch(err => {
                console.log(err);
                return null;
            });
            // .then((response) => {

            //     // var path = response.data.US.flatrate
            //     if (response.data.US && response.data.US.flatrate && response.data.US.flatrate.length > 0) {
            //         for (let i = 0; i < 1; i++) {
            //             tempArray.push(response.data.US.flatrate[i].provider_name)
            //         }
            //         console.log("array :" + tempArray)
            //     }

            // })
            // .then(() => {
            //     if (tempArray.length > 0) {
            //         this.setState({streaming: tempArray, available: 'Available On: '})
            //     } else {
            //         this.setState({available: "Bummer, this isn't currently available on any streaming platform."})
            //     }
            // })
    }



    componentDidMount() {
       this.checkStream();
    }
    getUsers = () => {
       axios
           .get("https://reqres.in/api/users?page=1")
           .then(data => this.setState({ users: data.data.data }))
           .catch(err => {
               console.log(err);
               return null;
           });
    };

    render() {
       return (
           <div>
               {this.state.users.length === 0 ? (
                   <div>Loading...</div>
               ) : (
                   this.state.users.map((e, i) => {
                       return <div key={i}>{e.first_name}</div>;
                    })
               )}
           </div>
       );
     }
}