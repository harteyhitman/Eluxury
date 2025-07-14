import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from '../user/user.entity';

@Controller('dashboard')
export class DashboardController {
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  adminDashboard() {
    return {
      message: 'Welcome to Admin Dashboard',
      stats: {
        users: 1500,
        revenue: '$45,230',
        growth: '+12.5%',
      },
    };
  }
}