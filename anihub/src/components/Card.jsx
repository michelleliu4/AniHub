import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
import Like from '../assets/like-icon.svg';

const Card = (props) =>  {
  var d = new Date(props.created_at).toLocaleDateString();
  var t = new Date(props.created_at).toLocaleTimeString();

  return (
      <div className="Card">
          <div className="card-dates">Created {d} {t}</div>
          <Link to={'details/'+ props.id}><button className="card-details" alt="edit button">{props.title}</button></Link>
          <div className="post-like-container">
            <img className="postLikeButton" src={Like} />
            <div className="postLikeCount">{props.likes} likes</div>
          </div>
      </div>
  );
};

export default Card;