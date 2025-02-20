
-- Adding more sample books
DO $$ 
DECLARE
  admin_id uuid;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_id
  FROM profiles
  WHERE role = 'admin'
  LIMIT 1;

  -- Insert 10 new sample books
  INSERT INTO books (title, author, description, cover_url, genre, publication_date, rating, isbn, user_id) VALUES
    ('The Art of Innovation', 'Dr. Emily Chen', 'A comprehensive guide to fostering creativity and innovation in business', 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32', ARRAY['Business', 'Self-Help'], '2024-01-15', 4.9, '978-1234567940', admin_id),
    
    ('Echoes of Atlantis', 'Michael Drake', 'An underwater archaeological adventure that uncovers ancient mysteries', 'https://images.unsplash.com/photo-1482275548304-a58859dc31b7', ARRAY['Adventure', 'Historical Fiction'], '2023-11-30', 4.7, '978-1234567941', admin_id),
    
    ('Digital Dystopia', 'Sarah Chen', 'A chilling look at the dark side of technology and social media', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', ARRAY['Science Fiction', 'Technology'], '2024-02-10', 4.8, '978-1234567942', admin_id),
    
    ('The Mindful Chef', 'James Martinez', 'A collection of healthy recipes combined with mindfulness practices', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f', ARRAY['Cooking', 'Self-Help'], '2023-12-20', 4.6, '978-1234567943', admin_id),
    
    ('Quantum Entanglement', 'Dr. Robert Kim', 'A romance story between two quantum physicists across parallel universes', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', ARRAY['Romance', 'Science Fiction'], '2024-01-25', 4.5, '978-1234567944', admin_id),
    
    ('The Last Symphony', 'Isabella Romano', 'A haunting mystery set in a prestigious music conservatory', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c', ARRAY['Mystery', 'Drama'], '2023-10-15', 4.8, '978-1234567945', admin_id),
    
    ('Green Revolution', 'Environmental Council', 'A practical guide to sustainable living and environmental conservation', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', ARRAY['Environment', 'Self-Help'], '2024-02-20', 4.7, '978-1234567946', admin_id),
    
    ('The Cosmic Dance', 'Dr. Maria Patel', 'An exploration of the intersection between quantum physics and Eastern philosophy', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564', ARRAY['Science', 'Philosophy'], '2023-09-30', 4.9, '978-1234567947', admin_id),
    
    ('Urban Legends', 'Marcus Thompson', 'A collection of modern folklore and urban myths from around the world', 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc', ARRAY['Horror', 'Non-Fiction'], '2024-01-05', 4.4, '978-1234567948', admin_id),
    
    ('The Art of Code', 'Tech Masters Guild', 'A beautiful exploration of programming as a creative art form', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', ARRAY['Technology', 'Art'], '2024-02-15', 4.8, '978-1234567949', admin_id);
END $$;