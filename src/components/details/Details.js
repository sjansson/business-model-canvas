import React, { useState, useEffect, Fragment } from 'react'
import './Details.css'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { API } from 'aws-amplify'

export default function Details(props) {
  const [writeMode, setWriteMode] = useState(false)
  const [header, setHeader] = useState('')
  const [text, setText] = useState('')

  const handleHeaderChange = event => {
    setHeader(event.target.value)
  }

  const handleTextChange = event => {
    setText(event.target.value)
  }

  useEffect(() => {
    if (props.listResponse.length === 0) props.getCanvasData()
  }, [])

  const toggleMode = () => {
    setWriteMode(!writeMode)
  }

  const updateItem = () => {
    API.put('bmc-items', '/bmc-items/update?Team=Team Continuous', {
      body: {
        TableName: 'BusinessModelCanvas',
        ItemHeader: header,
        ItemText: text,
      },
      queryStringParameters: {
        Team: 'Team Continuous',
        BlockUuid: getCurrentBlockFromUrl().items[0].BlockUuid,
      },
    }).then(() => {
      props.getCanvasData()
      toggleMode()
    })
  }

  const deleteItem = () => {
    API.del('bmc-items', '/bmc-items/delete?Team=Team Continuous', {
      body: {
        TableName: 'BusinessModelCanvas',
      },
      queryStringParameters: {
        Team: 'Team Continuous',
        BlockUuid: getCurrentBlockFromUrl().items[0].BlockUuid,
      },
    }).then(() => {
      props.getCanvasData()
      toggleMode()
    })
  }

  const getCurrentBlockFromUrl = () => {
    const emptyBlock = {
      block: '',
      blockDescription: '',
      items: [{ itemHeader: '', ItemText: '' }],
    }

    const foundBlock = props.listResponse.find(({ block }) => {
      const blockKebabCased = block.replace(' ', '-').toLowerCase()
      return blockKebabCased === props.match.params.blockType
    })
    return foundBlock ? foundBlock : emptyBlock
  }

  const form = () => {
    if (writeMode) {
      return (
        <Fragment>
          <div className="details-card" data-testid="details-writemode">
            <div className="details-card-container">
              <Form className="details-card-write">
                <Form.Group>
                  <Form.Control
                    onChange={handleHeaderChange}
                    defaultValue={getCurrentBlockFromUrl().items[0].ItemHeader}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows="15"
                    autoFocus
                    data-testid="details-updateform-text"
                    onChange={handleTextChange}
                    defaultValue={getCurrentBlockFromUrl().items[0].ItemText}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="details-delete">
            <Button variant="danger" onClick={deleteItem}>
              Delete
            </Button>
          </div>
          <div className="details-cancel">
            <Button variant="secondary" onClick={toggleMode}>
              Cancel
            </Button>
          </div>
          <div className="details-submit">
            <Button variant="success" onClick={updateItem}>
              Update
            </Button>
          </div>
        </Fragment>
      )
    } else if (getCurrentBlockFromUrl().items[0] !== undefined) {
      return (
        <div className="details-card" data-testid="details-readmode">
          <div className="details-card-container">
            <div className="details-card-read-header">
              {getCurrentBlockFromUrl().items[0].ItemHeader}
            </div>
            <div className="details-card-read-text" data-testid="details-readform-text">
              {getCurrentBlockFromUrl().items[0].ItemText}
            </div>
          </div>
          <div className="details-submit">
            <Button variant="success" onClick={toggleMode}>
              Edit
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="details-card" data-testid="details-readmode">
          <div className="details-card-container">
            <div className="details-card-read-header" />
            <div className="details-card-read-text" data-testid="details-readform-text" />
          </div>
        </div>
      )
    }
  }

  const listItems = () => {
    const block = getCurrentBlockFromUrl()
      .block.replace(' ', '-')
      .toLowerCase()
    const list = getCurrentBlockFromUrl().items.map(item => {
      return (
        <ListGroup.Item
          action
          data-testid="details-list-item"
          href={`/details/${block}/${item.BlockUuid}`}
        >
          {item.ItemHeader}
        </ListGroup.Item>
      )
    })

    if (getCurrentBlockFromUrl().items[0] !== undefined) {
      return (
        <div className="details-list">
          <ListGroup>{list}</ListGroup>
        </div>
      )
    }
  }

  return (
    <div>
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">{getCurrentBlockFromUrl().block}</div>
          <div className="details-create">
            <Link to="/item/create" data-testid="createItemButton">
              <i className="fa fa-plus" /> Create item
            </Link>
          </div>
          {form()}
          {listItems()}
        </div>
        <Link to="/canvas" data-testid="goBackToCanvasButton">
          Go back to Canvas
        </Link>
      </div>
    </div>
  )
}
