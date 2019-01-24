import React from 'react'
import Item from '../components/Item'
import {itemHeader as header} from '../utils/obj'
import {Container,ListGroup,ListGroupItem} from 'reactstrap'


const Content = ({
    title,
    items,
    loading,
    error
}) =>
    <Container className='const-container'>
        {loading ? <h1>Loading...</h1> :
            <div>
                <h2 className='text-center headline'>
                    {title}
                </h2>
                <ListGroup className='content-list-group'>
                    <ListGroupItem>
                        <Item item={header}/>
                    </ListGroupItem>
                    {items ? Object.keys(items).map(key =>
                        <ListGroupItem>
                            <Item item={items[key]}/>
                        </ListGroupItem>
                    ) : "No items"}
                </ListGroup>
            </div>
        }
        {error ? <span>{error}</span> : ''}
    </Container>


export default Content