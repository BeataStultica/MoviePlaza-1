import c from './Comment.module.css';
import { /*React,*/ useState, useEffect } from 'react';

function Comment({ work }) {
    const [user, setUser] = useState({});
    //console.log(work);
    useEffect(() => {
        fetch('https://movieplazaback.herokuapp.com/users/' + work.userid)
            .then((res) => res.json())
            .then((res) => setUser(res));
    }, [work.userid]);
    return (
        <div className={c['comment-block']}>
            <div className={c.avatar}>
                <img
                    className={c['avatar_img']}
                    src={'https://movieplazaback.herokuapp.com/images/' + user.userimage}
                    alt={work.userid}
                />
            </div>
            <div className={c.author}>
                <p className={c.login}>{user.login}</p>
                <p className={c.date}>
                    {work.commentdate === ''
                        ? new Date().toLocaleDateString().split('.').join('-') +
                          ' ' +
                          new Date().toLocaleTimeString('ua-UA')
                        : work.commentdate.split('T').join(' ').split('.')[0]}
                </p>
            </div>
            <div className={c.comment}>
                <p>{work.comments}</p>
            </div>
        </div>
    );
}
export default Comment;
