import React, { useState } from "react"
import clsx from "clsx"
import { MaterialIcon } from "@sangre-fp/ui"
import styles from "./ThumbUp.module.css"
import {likeApi} from '../../helpers/likeFetcher'

const ThumbUp = ({gid, rid, pid, cid, view, size}) => {
  const [liked, setLiked] = useState(false)
  const [amountLikes, setAmountLikes] = useState(0)
  const [error, setError] = useState(null)

  const fetchStatusLikeOfCurrentUser = async () => {
    try {
      const {data: { plus_votes }} = await likeApi.getLike(gid, rid, pid, cid)
      console.log(22289, plus_votes)
      setLiked(Number(plus_votes) === 1)
    } catch (error) {
      setError(error)
    }
  }

  const fetchAllLikes = async () => {
    try {
      
      const {data: { plus_votes }} = await likeApi.getLikes(gid, rid, pid, cid)
      console.log(999, plus_votes)
      setAmountLikes(plus_votes ? plus_votes : 0)
    } catch (error) {
      setError(error)
    }
  }

  const toggleLikedBtn = async () => {
    try {
      if (liked === true) {
        setLiked(false)
        setAmountLikes(amountLikes => amountLikes - 1)
        await likeApi.addLike(gid, rid, pid, cid, {up: false})
      } else {
        setLiked(true)
        setAmountLikes(amountLikes => amountLikes + 1)
        await likeApi.addLike(gid, rid, pid, cid, {up: true})
      }
    } catch (error) {
      setError(error)
    }
  }

  React.useEffect(() => {
    try {
      console.log(11111, gid, rid, pid, cid, view, size)
      fetchAllLikes()
      fetchStatusLikeOfCurrentUser()
    } catch (e) {
      setError(e)
    }
  }, [])


  const wrapperThumbUp = {
    height: size ? `${size}px` : '24px',
  }

  return (
    <div className={styles.VotingLike_Wrapper} style={wrapperThumbUp}>
        {
          view === 'thumb_up' && <MaterialIcon
          className={clsx(styles.ThumbUp_Btn, liked ? styles.active : "")}
          onClick={toggleLikedBtn}
          fontSize={`${size}px`}
        >
          thumb_up
        </MaterialIcon>
        }
        {
          amountLikes >= 0 && view === 'thumb_up_results' && <MaterialIcon
          className={clsx(styles.ThumbUp_Btn, liked ? styles.active : "")}
          fontSize={`${size}px`}
          onClick={toggleLikedBtn}
        >
          thumb_up
        </MaterialIcon>
        }
        {
          amountLikes > 0 && view === 'thumb_up_results' &&  <span className={styles.likeAmount} >{amountLikes}</span>
        }
        {
          amountLikes > 0 && view === 'thumb_up' &&  <span className={styles.likeAmount} >{amountLikes}</span>
        }
      </div>
  );
};

export default ThumbUp

