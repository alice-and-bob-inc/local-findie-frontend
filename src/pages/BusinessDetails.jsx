

function BusinessDetails () {
    const [ currentBusiness, setCurrentBusiness ] = useState(null);
    const { businessId } = useParams()

    const getSpecificBusiness = () => {
        axios.get(`/api/businesses/${}`)
    }


    return (
        <>
        
        </>
    )
}

export default BusinessDetails;