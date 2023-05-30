import ListingListItem from "./ListingListItem"

const ListingList = ({listings}) => {
    const listingList = listings.map((listing) => {
        return (
            <ListingListItem key={listing.id} listing={listing} />
        )
    })

    return (
        <div className="listing-list-container">
            <ul>
                {listingList}
            </ul>
        </div>
    )
}

export default ListingList