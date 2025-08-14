<?php

namespace App\Console\Commands;

use App\Models\Team;
use Illuminate\Console\Command;

class ForceUpdateTeamPaths extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:force-update-team-paths';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '强制刷新全量团队路径信息';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Team::updatePaths();
    }
}
