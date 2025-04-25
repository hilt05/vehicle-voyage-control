
-- Create service providers table
CREATE TABLE IF NOT EXISTS service_providers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    location VARCHAR(255),
    rating FLOAT,
    notes TEXT,
    website VARCHAR(255),
    status VARCHAR(20) NOT NULL,
    maintenance_count INT DEFAULT 0,
    last_service VARCHAR(255)
);

-- Create provider service types table
CREATE TABLE IF NOT EXISTS provider_service_types (
    provider_id BIGINT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    PRIMARY KEY (provider_id, service_type),
    FOREIGN KEY (provider_id) REFERENCES service_providers(id) ON DELETE CASCADE
);

-- Create inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    part_number VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    current_stock INT DEFAULT 0,
    min_stock_threshold INT DEFAULT 5,
    supplier VARCHAR(255),
    supplier_contact VARCHAR(255),
    price_per_unit DECIMAL(10, 2),
    last_purchase_date DATE,
    image_url VARCHAR(1000)
);

-- Create usage records table
CREATE TABLE IF NOT EXISTS usage_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inventory_item_id BIGINT,
    date DATE,
    quantity INT,
    maintenance_id VARCHAR(255),
    vehicle VARCHAR(255),
    FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);
