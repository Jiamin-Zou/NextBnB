import ListingListItem from "./ListingListItem"
import "./ListingList.css"

const ListingList = ({listings}) => {
    const listingList = listings.map((listing) => {
        return (
            <ListingListItem key={listing.id} listing={listing} />
        )
    })

    return (
        <div className="listing-list-container">
            <ul className="listing-index-list">
                {listingList}
            </ul>
        </div>
    )
}

export default ListingList