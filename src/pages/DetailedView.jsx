import CardDetail from '../components/CardDetail'

function DetailedView() {
    return (
        <div className="post-view">  
            <div className="d-view">
                <CardDetail />
            </div>  
            <div className="function-btns">
                <button>Edit</button>
                <button>Delete</button>
            </div>  
        </div>
    )
}

export default DetailedView;