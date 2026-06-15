// Shared poster data for the Canap case study — consumed by both
// the homepage card backdrop (`CanapCardBackdrop`) and the case-
// study Hero backdrop (`CanapHeroBackdrop`). Single source of
// truth so swapping a poster is one edit, not two.
//
// Array order is intentional: the strongest design-recruiter-coded
// titles land at positions 6, 7, 8, 13, 14 — the visual "hot zone"
// when the rotated marquee grid first renders. See either consumer
// component for the row-layout map.

export const POSTER_BASE = 'https://image.tmdb.org/t/p/w342';

export const POSTER_PATHS = [
  // Row 0
  '/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg', // 2001: A Space Odyssey
  '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', // Dune: Part Two
  '/602vevIURmpDfzbnv5Ubi6wIkQm.jpg', // Oppenheimer
  '/pEzNVQfdzYDzVK0XqxERIw2x2se.jpg', // Arrival
  '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', // Blade Runner 2049
  // Row 1 (hot zone middle — top design picks)
  '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', // In the Mood for Love
  '/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg', // Her                      ← HOT
  '/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg', // Severance                ← HOT
  '/7v8iCNzKFpdlrCMcqCoJyn74Nsa.jpg', // Mad Men                  ← HOT
  '/5maYKYzWpE68ycxGh1luu4P2LOS.jpg', // Spirited Away
  // Row 2 (hot zone right — top design picks)
  '/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg', // Black Mirror
  '/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg', // Ex Machina
  '/kv1nRqgebSsREnd7vdC2pSGjpLo.jpg', // Mr. Robot
  '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', // The Grand Budapest Hotel ← HOT
  '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', // Drive                    ← HOT
  // Row 3
  '/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg', // Dark
  '/gbSaK9v1CbcYH1ISgbM7XObD2dW.jpg', // The White Lotus
  '/j1NsoYYDYHnPkRr7Enqr8tlexgO.jpg', // Planet Earth II
  '/v4QfYZMACODlWul9doN9RxE99ag.jpg', // Blue Planet II
  '/iYypPT4bhqXfq1b6EnmxvRt6b2Y.jpg', // Free Solo
];
