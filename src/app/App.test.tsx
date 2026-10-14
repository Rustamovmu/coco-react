import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { MEDIA } from '../lib/media';

// Swiper ships ESM; the CRA Jest runner needs a test double for this UI dependency.
jest.mock('swiper', () => ({ Autoplay: {}, Navigation: {}, Pagination: {} }));
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });
jest.mock('swiper/css/pagination', () => ({}), { virtual: true });
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => require('react').createElement('div', null, children),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => require('react').createElement('div', null, children),
}));
jest.mock('./services/ProductService', () => ({ __esModule: true, default: class { getProducts() { return Promise.resolve([]); } } }));
jest.mock('./services/MemberService', () => ({ __esModule: true, default: class { getTopUsers() { return Promise.resolve([]); } } }));

test('renders the home screen with bundled editorial media', async () => {
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = jest.fn().mockImplementation(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  const play = jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  const container = document.createElement('div');
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <Provider store={store}>
        <MemoryRouter><App /></MemoryRouter>
      </Provider>
    );
  });

  expect(container.querySelector('h1')).toHaveTextContent('Dress withintention.');
  expect(container.querySelector('video')!.getAttribute('src')).toBe(MEDIA.hero.video);
  expect(container.querySelector('img.coco-background-poster')!.getAttribute('src')).toBe(MEDIA.hero.poster.src);
  expect(container.innerHTML).not.toMatch(/images\.unsplash|images\.pexels|videos\.pexels/);

  act(() => root.unmount());
  play.mockRestore();
  pause.mockRestore();
  scroll.mockRestore();
  window.matchMedia = originalMatchMedia;
});
