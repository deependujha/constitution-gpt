import axios from 'axios';

const MakeAPIRequest = async ( msg: string ) => {
	try {
		const r = await axios.post( '/api/', {
			meow: msg,
		} );

		// console.log(r.data);
		const { response } = r.data;
		return response;
	} catch ( error ) {
		console.log( `Error occurred while making API request` );
		console.log( error );
		return 'An error occurred while making API request';
	}
};

export default MakeAPIRequest;
