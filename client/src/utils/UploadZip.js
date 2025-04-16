import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const uploadZip = async (zipFile) => {
    try {
        const formData = new FormData();
        formData.append('zipFile', zipFile); 

        const response = await Axios({
            ...SummaryApi.uploadZip, 
            data: formData
        });

        return response;
    } catch (error) {
        return error;
    }
};

export default uploadZip;
