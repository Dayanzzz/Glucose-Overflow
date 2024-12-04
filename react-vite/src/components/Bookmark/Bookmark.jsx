import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, deleteBookmark } from '../../redux/bookmark'; // Assuming deleteBookmark is a Redux action
import { Link } from 'react-router-dom';
import './Bookmark.css';
import Sidebar from '../SideBar/SideBar';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const error = useSelector((state) => state.bookmarks.error);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  // Log errors to the console (if any) but don't show them on the page
  useEffect(() => {
    if (error) {
      console.error('Error fetching bookmarks:', error.message || error);
    }
  }, [error]);

  const handleDeleteBookmark = (bookmarkId) => {
    // Dispatch deleteBookmark action to remove the bookmark
    dispatch(deleteBookmark(bookmarkId));
  };

  return (
    <div className="bookmarks-page-wrapper">
      <Sidebar />
      <div className="bookmarks-list-container">
        <h1 className="bookmarks-title">Your Bookmarks</h1>

        {/* Display bookmarks if available */}
        {bookmarks.length > 0 ? (
          <div className="bookmark-grid">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmark-tile">
                <Link to={`/questions/${bookmark.question_id}`} className="bookmark-title-link">
                  <h2>{bookmark.question_title}</h2>
                </Link>
                <p>{bookmark.question_text}</p>

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                  className="delete-bookmark-btn"
                >
                  Delete Bookmark
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>No bookmarks found.</div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
