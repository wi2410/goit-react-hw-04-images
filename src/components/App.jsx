// import { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button, ImageGallery, Loader, Searchbar } from 'components/index';
import { getImages } from 'services/ApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setlsLoading] = useState(false);
  const [error, setError] = useState(false);
  const prevPage = useRef(1);
  const prevQuery = useRef('');

  useEffect(() => {
    const fetchData = async () => {
      setlsLoading(true);
      const res = await getImages(query, page);
      setlsLoading(false);

      if (res.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setError(true);
        setPage(prevPage.current);
        setQuery(prevQuery.current);
        return;
      }

      if (page === 1) {
        const totalPages = Math.ceil(res.totalHits / 12);
        setTotalPages(totalPages);
        setImages([]);
      }

      prevPage.current = page;
      prevQuery.current = query;

      setImages(images => [...images, ...res.hits]);

      if (page !== 1 && !error) {
        scroll('bottom');
      } else {
        scroll('top');
      }
    };

    if (query && !error) {
      fetchData();
    }
  }, [page, query, error]);

  useEffect(() => {
    if (totalPages && page >= totalPages) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }, [totalPages, page]);

  const onSubmit = async evt => {
    evt.preventDefault();
    const input = evt.target.elements.search;
    const value = input.value.trim();
    const page = 1;

    if (value === '') {
      Notify.warning("You didn't enter anything!");
      return;
    }

    setQuery(value);
    setPage(page);
    setError(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setError(false);
  };

  const scroll = direction => {
    const { clientHeight, scrollHeight } = document.documentElement;

    setTimeout(
      () =>
        window.scrollBy({
          top: direction === 'top' ? -scrollHeight : clientHeight - 180,
          behavior: 'smooth',
        }),
      1
    );
  };

  const isNotEmpty = images.length !== 0;
  const isNotEndList = page < totalPages;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {isNotEmpty && <ImageGallery images={images} />}
      {loading ? (
        <Loader />
      ) : (
        isNotEmpty && isNotEndList && <Button onClick={loadMore} />
      )}
    </>
  );
};