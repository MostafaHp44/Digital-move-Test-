<?php

use App\Models\Message;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@digitalmov.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('DigitalMov2026!'),
                'role' => 'admin',
            ]
        );

        // Seed Services
        $services = [
            [
                'title' => 'Digital Menu',
                'subtitle' => 'QR-first menus that feel like an app.',
                'description' => 'Complete digital menu solution with QR codes, online ordering, payment integration and delivery service connectivity.',
                'icon' => 'QR',
                'features' => ['QR Code Access', 'PDF Menu', 'Online Menu', 'Direct Ordering', 'Online Payment', 'Delivery Integration'],
                'media_type' => 'image',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Branding & Graphic Design',
                'subtitle' => 'Visual identities that leave a mark.',
                'description' => 'Complete visual designs for restaurants, cafés and businesses — from menus to social media, packaging to promotional items.',
                'icon' => 'BD',
                'features' => ['Menu & Leaflets', 'Stickers & Packaging', 'Caps & Promo Items', 'Social Media Graphics', 'Banners', 'Printed Materials'],
                'media_type' => 'image',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Website Development',
                'subtitle' => 'Complete web solutions, designed to perform.',
                'description' => 'Full-stack website development with admin dashboard, so you can manage your content, products and orders — no developer needed.',
                'icon' => 'WD',
                'features' => ['UI/UX Design', 'Front-End & Back-End', 'Database & APIs', 'Payment Integration', 'Responsive Design', 'Admin Dashboard'],
                'media_type' => 'image',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Digital Business Card',
                'subtitle' => 'Your identity, one tap away.',
                'description' => 'Modern digital business cards accessible via NFC tap or QR code scan — instant access to contact information.',
                'icon' => 'DC',
                'features' => ['NFC Card / Tag', 'QR Code Access', 'Instant Contact Sharing', 'Custom Design', 'Mobile Optimized', 'Easy Updates'],
                'media_type' => 'image',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($services as $data) {
            Service::firstOrCreate(
                ['title' => $data['title']],
                $data
            );
        }

        // Seed Projects
        $projects = [
            [
                'title' => 'Noir Table',
                'category' => 'Digital Menu',
                'year' => '2026',
                'blurb' => 'A fine-dining menu experience where every category transition is choreographed.',
                'media_url' => '/work-1.jpg',
                'media_type' => 'image',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Velocity',
                'category' => 'Motion Identity',
                'year' => '2025',
                'blurb' => 'A brand system built entirely around light trails and momentum.',
                'media_url' => '/work-2.jpg',
                'media_type' => 'image',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Aurora',
                'category' => 'Brand & Web',
                'year' => '2025',
                'blurb' => 'Members-only club identity, from print edges to interactive invitations.',
                'media_url' => '/work-3.jpg',
                'media_type' => 'image',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Vellora',
                'category' => 'Interactive Kiosk',
                'year' => '2026',
                'blurb' => 'Lobby check-in experience running across hotel screens in four languages.',
                'media_url' => '/work-4.jpg',
                'media_type' => 'image',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($projects as $data) {
            Project::firstOrCreate(
                ['title' => $data['title']],
                $data
            );
        }

        // Seed sample messages
        $messages = [
            [
                'name' => 'Ahmed Hassan',
                'email' => 'ahmed@example.com',
                'subject' => 'Digital Menu for Restaurant',
                'message' => 'Hi, I would like to get a digital menu for my restaurant. Can you provide more details about pricing?',
                'is_read' => false,
            ],
            [
                'name' => 'Sara Mohamed',
                'email' => 'sara@example.com',
                'subject' => 'Website Redesign',
                'message' => 'We need to redesign our company website. Looking for a modern, responsive design with an admin dashboard.',
                'is_read' => false,
            ],
        ];

        foreach ($messages as $data) {
            Message::create($data);
        }
    }
}
