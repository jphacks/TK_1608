<?php

use Illuminate\Database\Seeder;

class ModeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modes')->insert([
            'name' => 'chat',
            'is_active' => true
        ]);
        DB::table('modes')->insert([
            'name' => 'shiritori',
            'is_active' => false
        ]);
        DB::table('modes')->insert([
            'name' => 'fivebomber',
            'is_active' => false
        ]);
    }
}
